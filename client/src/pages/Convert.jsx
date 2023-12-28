import axios from "axios";
import {
    Button,
    Container,
    FileInput,
    Group,
    Image,
    NativeSelect,
    Loader
} from "@mantine/core";
import { useState } from "react";
import { publicAPI } from "../api/axios";


function ConvertImage() {
    const [image, setImage] = useState(null);
    const [convertType, setConvertType] = useState("jpg");
    const [isLoading, setIsLoading] = useState(null);
    const [urls, setUrls] = useState({ id: 0, org_public_id: "", pro_public_id: "", original_file_url: "", processed_file_url: "" })

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData;
        formData.append("image", image);
        setIsLoading(true);
        const response = await publicAPI.post(`/convert/${convertType}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: progressEvent => {
                console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
            }
        });
        const { success, urls } = response.data;
        if (success) {
            setIsLoading(false);
            setUrls({ ...urls });
        } else {
            console.error("error fetching urls")
        }
    };

    async function handleDownloadImage(image_url) {
        try {
            const response = await axios.get(image_url, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${image?.name.split('.')[0]}.` + convertType);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.log(error);
        };
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
                {
                    isLoading
                        ?
                        <Loader color="blue" style={{ marginInline: "46%" }} />
                        :
                        !urls.processed_file_url
                            ?
                            <p style={{textAlign: "center"}}>Upload an image</p>
                            :
                            <Image src={urls.processed_file_url} alt={urls.original_file_url} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                }
                <br />
                <Button disabled={isLoading || urls.processed_file_url === ""} style={{ marginBlock: "0.5rem" }} onClick={() => handleDownloadImage(urls.processed_file_url)}>Download</Button>
            </Container>
        </Container>
    );
};

export default ConvertImage;