class TriviaQuestions {
    constructor() {
        this.baseUrl = ("https://opentdb.com");
    }  

    async getQuestion() {
        try{
        const response = await axios.get(`${this.baseUrl}/api.php?amount=10&category=11&difficulty=easy&type=multiple`);
        // console.log(response.data.results)
        return response.data.results;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}