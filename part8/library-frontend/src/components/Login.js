const { gql, useMutation } = require("@apollo/client")
const { useState, useEffect } = require("react")

const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(
            username: $username
            password: $password
        ) { 
            value
        }
    }
`

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            props.setError(error.graphQLErrors[0].message)
        }
    })
    
    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('library-user-token', token)
            console.log(token)
        }
    }, [result.data])

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()
        login({variables: {username, password}})
    }

    return (
        <form onSubmit={submit}>
            username<input value={username} onChange={({target}) => setUsername(target.value)}/>
            password<input type="password" value={password} onChange={({target}) => setPassword(target.value)}></input>
            <button type="submit">login</button>
        </form>
    )
}

export default Login