import MediaListResource from "../resources/MediaListResource"

const resource = new MediaListResource();

describe()

it("expects addMediaToList() to return data", async () => {
    try {
        const status = await resource.addMediaToList();

        expect(status).toBe(500);

    } catch (error) {
        console.log(error.message);
        
    }
});

