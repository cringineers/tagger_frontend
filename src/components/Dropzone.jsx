import { useState, useEffect } from "react";
import { useDropzone } from 'react-dropzone';
import axiosRequest from "../helpers/api";

const Dropzone = () => {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'text/html': ['.html', '.htm'],
    },
    maxFiles: 1
  });

  useEffect(() => {
    const formData = new FormData();
    const [file] = acceptedFiles;
    formData.append("file", file);

    axiosRequest.post("/api/image", formData, {'name': 'q'})
      .then((res) => {
      })
      .catch((error) => {
      });;
  }, [acceptedFiles]);

  return (
    <section className="dropzone-container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Переместите сюда файлы, или кликните, чтобы выбрать</p>
        <em>(Только *.jpeg и *.png поддерживаются)</em>
        <em>(Можно загрузить только один файл за один раз)</em>
      </div>
    </section>
  );
};

export default Dropzone;
