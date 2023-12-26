import {
    Button,
    Container,
    FileInput,
    Group,
    Image,
    NativeSelect
} from "@mantine/core";
import { useState } from "react";
import { publicAPI } from "../api/axios";

function ConvertImage() {
    const [image, setImage] = useState(null);
    const [convertType, setConvertType] = useState("jpg");
    const [urls, setUrls] = useState({ original_file_url: "", processed_file_url: "" })


    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData;
        formData.append("image", image);
        const response = await publicAPI.post(`/image/${convertType}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: progressEvent => {
                console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
            }
        });
        const { success, urls } = response.data;
        if (success) {
            setUrls({ original_file_url: urls.original_file_url, processed_file_url: urls.processed_file_url });
        } else {
            console.error("error fetching urls")
        }
    };

    return (
        <Container style={{ width: "80%", marginBlock: "10%" }}>
            <Group style={{ width: '100%' }}>
                <FileInput
                    label="Your image"
                    size="md"
                    radius="md"
                    placeholder="example: example.jpg"
                    style={{ width: "80%" }}
                    onChange={(file) => setImage(file)}
                />
                <NativeSelect size="md" radius="md" style={{ width: "15%" }} description="convert to" data={["jpg", "png", "webp", "gif"]} onChange={(e) => setConvertType(e.target.value)} />
            </Group>
            <Button style={{ marginBlock: "0.5rem" }} onClick={handleSubmit}>Convert</Button>
            <Container style={{ marginBlock: "2rem" }}>
                <h3 style={{ textAlign: "center" }}>Your Image</h3>
                <Image src="http://localhost:3000/processed_uploads/356081663_818885396296819_4993695467196596493_n.png" width={300} height={300} />
                <Button style={{ marginBlock: "0.5rem" }}>Download</Button>
            </Container>
        </Container>
    );
};

export default ConvertImage;