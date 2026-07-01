export default class StandardData {
    async getFolderNames() {
        try {
            const response = await fetch(`${process.env.BASE_URL}/api/folders`);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();             

            return await result;

        } catch (error) {
            console.log(error.message);

        }
    }
    
}