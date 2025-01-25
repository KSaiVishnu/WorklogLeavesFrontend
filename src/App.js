import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file!');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        try {
            const apiUrl = "https://worklogleavesbackend.onrender.com";
            // console.log(apiUrl);
            const response = await axios.post(`${apiUrl}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'FilteredUsers.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error processing the file.');
        }
    };

    return (
        <div>
            <h1>Upload and Process Excel File</h1>
            <input type="file" accept=".xlsx" onChange={handleFileChange} />
            <button onClick={handleUpload}>Generate Output</button>
        </div>
    );
};

export default App;