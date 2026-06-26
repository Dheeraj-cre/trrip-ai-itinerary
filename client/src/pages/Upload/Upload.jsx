import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadDocument } from "../../services/uploadService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Upload.css";

export default function Upload() {

  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {

    if (acceptedFiles.length > 0) {

      setFile(acceptedFiles[0]);

    }

  }, []);

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({

      onDrop,

      accept: {
        "application/pdf": [".pdf"],
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
      },

      maxFiles: 1,

    });

  const handleUpload = async () => {

    if (!file) {

      toast.error("Please select a file");

      return;

    }

    const formData = new FormData();

    formData.append("document", file);

    try {

      setLoading(true);

      const res = await uploadDocument(formData);

      toast.success("Itinerary Generated Successfully");

      navigate(`/itinerary/${res.data.itinerary._id}`);

    } catch (err) {

      toast.error(err.response?.data?.message || "Upload Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="upload-page">

      <div className="upload-card">

        <h1>Upload Travel Document</h1>

        <p>

          Upload your Flight Ticket, Hotel Booking or Travel Document.

        </p>

        <div
          {...getRootProps()}
          className={`dropzone ${
            isDragActive ? "active" : ""
          }`}
        >

          <input {...getInputProps()} />

          {file ? (

            <div>

              <h3>{file.name}</h3>

              <p>

                {(file.size / 1024).toFixed(2)} KB

              </p>

            </div>

          ) : (

            <div>

              <h2>📂 Drag & Drop File Here</h2>

              <p>or Click to Browse</p>

            </div>

          )}

        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
        >
          {loading
            ? "Generating AI Itinerary..."
            : "Generate Itinerary"}
        </button>

      </div>

    </div>

  );

}