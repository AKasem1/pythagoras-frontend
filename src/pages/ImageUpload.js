import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import port from '../BackendConfig';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const token = Cookies.get('auth')? JSON.parse(Cookies.get('auth')).token: null;
  const [key, setKey] = useState('');

  useEffect(() => {
    fetch(`${port}/admin/imguploadkey`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.key);
        setKey(data.key);
      })
      .catch(err => console.log(err));
  }, [token]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return;

    setUploading(true);
    console.log('Uploading image...');

    const formData = new FormData();
    formData.append('image', image);
    formData.set('key', key)

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?expiration=${key}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      console.log(data.data.url_viewer);

      const imageUrl = data.data.url
      setImageUrl(imageUrl);
      // sendToBackend(imageUrl);
      console.log('Image uploaded successfully:', response.json);
    } catch (error) {
      console.error('Error uploading the image:', error);
    } finally {
      setUploading(false);
    }
  };


  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>

      {imageUrl && (
        <div>
          <p>Image uploaded successfully!</p>
          <img src={imageUrl} alt="Uploaded" style={{ width: '200px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
