import { Client, Databases, ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject(PROJECT_ID);

export const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
	try {
		// Check if this search term already exists
		const result = await database.listDocuments(
			DATABASE_ID,
			COLLECTION_ID,
			[Query.equal('searchTerm', searchTerm)]
		);

		if (result.documents.length > 0) {
			// Update existing document count
			const doc = result.documents[0];
			await database.updateDocument(
				DATABASE_ID,
				COLLECTION_ID,
				doc.$id,
				{ count: doc.count + 1 }
			);
			console.log('✅ Updated count for:', searchTerm);
		} else {
			// Create a new document
			await database.createDocument(
				DATABASE_ID,
				COLLECTION_ID,
				ID.unique(),
				{
					searchTerm,
					count: 1,
					movie_id: movie.id, // ✅ matches your schema
					poster_url: movie.poster_path
						? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
						: 'https://via.placeholder.com/500x750?text=No+Poster',
				}
			);
			console.log('✅ Created new entry for:', searchTerm);
		}
	} catch (error) {
		console.error('❌ Appwrite error:', error);
	}
};

export const getTrendingMovies = async () => {
	try {
		const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
			Query.limit(5),
			Query.orderDesc('count')
		])

		return result.documents
	} catch (error) {
		console.error(error)
	}
}

