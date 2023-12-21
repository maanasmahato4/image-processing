import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { EMAIL_REGEXP } from "../constants/RegExp";
import { validatePassword } from "../helpers/validatePassword";
import { privateAPI } from "../api/axios";
import { AppContext } from "../context/context";

function SignIn() {
    const navigate = useNavigate();
    const { setAccessToken, isAuthenticated, setIsAuthenticated } = useContext(AppContext);

    const signInForm = useForm({
        initialValues: {
            email: "",
            password: "",
            confirm_password: ""
        },
        validate: {
            email: (email) => (EMAIL_REGEXP.test(email) ? null : "Invalid Email"),
            password: (password) => (password.length < 8 ? "Password must be atleast 8 characters long" : null),
            confirm_password: (password) => (password.length < 8 ? "Password must be atleast 8 characters long" : null)
        }
    });

    async function handleSignInFormSubmit(values) {
        try {
            const user = validatePassword(values);
            const response = await privateAPI.post("/auth/signin", user);
            if (!response || response.status !== 200) {
                throw new Error(`Error ${response ? response.status : "No response"}`);
            };
            const { status, access_token } = response.data;
            if (status === "success") {
                setAccessToken(access_token);
                setIsAuthenticated(true);
            };
        } catch (error) {
            console.error(`An Error occured: ${error}`);
        };
    };
    

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        };
    }, [isAuthenticated]);

    return (
        <Container>
            <h1 style={{ textAlign: "center" }}>Login to your account</h1>
            <form onSubmit={signInForm.onSubmit((values) => handleSignInFormSubmit(values))} style={{ width: "60%", marginInline: "20%", marginBlock: "2rem" }} onReset={signInForm.onReset}>
                <TextInput label="Email" type="email" name="email" placeholder="abc@example.com" {...signInForm.getInputProps("email", { type: "input" })} withAsterisk />
                <TextInput label="Password" type="password" name="password" placeholder="password must be at least 8 characters long" {...signInForm.getInputProps("password", { type: "input" })} withAsterisk />
                <TextInput label="Confirm Password" type="password" name="confirm_password" placeholder="password must be at least 8 characters long" {...signInForm.getInputProps("confirm_password", { type: "input" })} withAsterisk />
                <Flex style={{ marginBlock: "0.7rem" }} justify={"space-between"}>
                    <Button.Group >
                        <Button type="submit" color="blue">Submit</Button>
                        <Button type="reset" color="red">Clear</Button>
                    </Button.Group>
                    <Button onClick={() => navigate("/signup")}>Don't have an account?</Button>
                </Flex>
            </form>
        </Container>
    )
};

export default SignIn;