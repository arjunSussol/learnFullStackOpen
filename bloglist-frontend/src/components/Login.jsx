export const Login = ({
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmitForm
}) => {
    return(
        <div>
            <h2>Login to application</h2>
            <form onSubmit={handleSubmitForm}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        id="user"
                        name="username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        id="pass"
                        name="password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}