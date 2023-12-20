import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, TextInput, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { EMAIL_REGEXP } from "../constants/RegExp";

function SignUp() {
    const navigate = useNavigate();

    const signUpForm = useForm({
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

    useEffect(() => {
        console.log("protected route is left in signup");
    }, []);

    return (
        <Container>
            <h1 style={{ textAlign: "center" }}>Make a new account</h1>
            <form onSubmit={signUpForm.onSubmit((values) => console.log(values))} style={{ width: "60%", marginInline: "20%", marginBlock: "2rem" }} onReset={signUpForm.onReset}>
                <TextInput label="Email" type="email" name="email" placeholder="abc@example.com" {...signUpForm.getInputProps("email", { type: "input" })} withAsterisk />
                <TextInput label="Password" type="password" name="password" placeholder="password must be at least 8 characters long" {...signUpForm.getInputProps("password", { type: "input" })} withAsterisk />
                <TextInput label="Confirm Password" type="password" name="confirm_password" placeholder="password must be at least 8 characters long" {...signUpForm.getInputProps("confirm_password", { type: "input" })} withAsterisk />
                <Flex style={{ marginBlock: "0.7rem" }} justify={"space-between"}>
                    <Button.Group >
                        <Button type="submit" color="blue">Submit</Button>
                        <Button type="reset" color="red">Clear</Button>
                    </Button.Group>
                    <Button onClick={() => navigate("/signin")}>Already have an account?</Button>
                </Flex>
            </form>
        </Container>
    )
};

export default SignUp;