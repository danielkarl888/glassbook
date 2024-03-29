import { Link } from "react-router-dom";
import { useState } from 'react';
import userList from './ManagingUsersList/userList';
import LinkToChat from "./LinkToChat";
import activeUser from "./ManagingUsersList/activeUser"
function LoginPage() {

    const [newUser, setNewUser] = useState({
        user_name: "",
        password: "",
    });
    const [valid, setValid] = useState(false);
    const [error, setError] = useState(false);

    const handleuser_nameChange = (event) => {
        setNewUser({ ...newUser, user_name: event.target.value })
        console.log(newUser.user_name);
    }
    const handlePasswordChange = (event) => {
        setNewUser({ ...newUser, password: event.target.value })
        console.log(newUser.password);
    }
    const handleSubmit = (event, newUser) => {
        event.preventDefault();
        fetch(`http://localhost:5182/api/Users/Login?user_name=${newUser.user_name}&password=${newUser.password}`)
            .then(res => {
                if (res.ok) {
                    setError(false);
                    activeUser.user_name = newUser.user_name;
                    activeUser.password = newUser.password;
                    setValid(true);
                } else {
                    setError(true);
                }
            })

    }
    const isValidUser = (newUser) => {
        if (!isExistuser_name(newUser.user_name)) {
            return false;
        }
        for (var j = 0; j < userList.length; j++) {
            if (newUser.password == userList[j].password && newUser.user_name == userList[j].user_name) {
                activeUser.user_name = userList[j].user_name;
                console.log("activeUser is");
                console.log(activeUser);
                return true;
            }
        }
        return false;
    }
    const isExistuser_name = (uname) => {
        for (var i = 0; i < userList.length; i++) {
            if (uname == userList[i].user_name) {
                return true;
            }
        }
        return false;
    }
    return (
        <>
            <div className="col-2"></div>
            <form
                autoComplete="off"
                onSubmit={e => handleSubmit(e, newUser)}
                className="col card mt-2"
                id="conncectCard">
                <div className="text-center">
                    <h1 className="display-3">Login</h1>
                </div>
                <div className="form-floating mb-3 input-padding-5">
                    <input
                        onChange={handleuser_nameChange}
                        type="text"
                        className="form-control mt-2"
                        id="floatingUser"
                        placeholder="user_name"
                        name="user_name"
                        value={newUser.user_name}>
                    </input>
                    <label htmlFor="floatingUser" className="fs-4">User Name</label>
                </div>
                <>
                    <div className="form-floating mb-3 input-padding-5">
                        <input
                            onChange={handlePasswordChange}
                            type="password"
                            className="form-control mt-2"
                            id="floatingPassword"
                            placeholder="Password"
                            name="Password"
                            value={newUser.password}>
                        </input>
                        <label htmlFor="floatingPassword" className="fs-4">Password</label>
                    </div>
                </>
                <div className="text-center">
                    <input type="submit" value="Log In" className="btn btn-primary text-center fs-5"></input>
                </div>
                <div className="form-floating mb-3 input-padding-5 p-3" id="login">

                    {valid ? <LinkToChat /> : (<div className="text-center text-danger h5 "> Please enter a valid username and password!</div>)}
                    {error ? <div className="text-center">error with interacting with the server- please try again!</div> : <></>}

                    <div className="text-center fs-5" id="submit">
                        <span>not Registered? <Link to='/regi' className="link" id="changeToRegister">
                            Click here</Link> to Register!</span>
                    </div>
                </div>
            </form>
            <div className="col-2"></div>

        </>
    );
}
export default LoginPage;