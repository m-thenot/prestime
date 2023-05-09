export const FAQ_PAGE_GRAPHQL_FIELDS = `
faqItemsCollection{
    items{
        question
        answer{
            json
        }
    }
}
`;

export const FAQ_HOME_GRAPHQL_FIELDS = `
question
answer{
    json
}
`;
