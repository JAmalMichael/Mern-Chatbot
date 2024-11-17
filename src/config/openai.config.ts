import Configuration from "openai"

export const configureOpenAI = () =>  {
    const apiKey = process.env.OPEN_AI_SECRET;
    const organizationId = process.env.OPENAI_ORGANIZATION_ID
    if (!apiKey) {
        throw new Error("Missing OpenAI API key.");
    }
    if (!organizationId) {
        throw new Error("Missing OpenAI organization ID.");
    }
    const config = new Configuration({
        apiKey: apiKey,
        organization: organizationId,
    })

    return config;
}

