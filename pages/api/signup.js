import withSession from '../../lib/session'
import marqetaClient from '../../lib/marqetaClient'

export default withSession(async (req, res) => {
    const { email, firstName, lastName } = await req.body

    try {
        const user = {
            isSignedIn: true,
            email: email,
            firstName: firstName,
            lastName: lastName
        }
        // 1. Create the user on the Marqeta platform
        const mqUserResponse = await marqetaClient.post('/users', {
            "first_name": firstName,
            "last_name": lastName,
            email: email,
            "active": true
        })
        const mqUser = mqUserResponse.data
        console.log('Created user: ', mqUser)

        // 2. Create a card for the Marqeta user
        const mqCardResponse = await marqetaClient.post('/cards', {
            card_product_token: "a61c65ec-bd9a-4073-886e-80ccc86c13fc",
            user_token: mqUser.token,
        })
        const mqCard = mqCardResponse.data
        console.log('Created card: ', mqCard)

        // 3. Fund the card
        const mqGPAOrderResponse = await marqetaClient.post('gpaorders', {
            "user_token": mqUser.token,
            "amount": "1000.00",
            "currency_code": "USD",
            "funding_source_token": "sandbox_program_funding"
        })
        const mqGPAOrder = mqGPAOrderResponse.data
        console.log('Created gpaOrder: ', mqGPAOrder)

        // 4. Store user and card on session for sample app
        user.mqCard = mqCard;
        user.mqUser = mqUser;
    } catch(err) {
        error.log(err)
    }
})