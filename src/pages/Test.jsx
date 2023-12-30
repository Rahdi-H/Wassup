import React, { useState } from 'react'
import supabase from '../supabase_config'

function Test() {
    const [imageLink, setImageLink] = useState('')
    const fetchImage = async () => {
        const { data, error } = supabase
                .storage
                .from('ProfilePictures')
                .getPublicUrl(`unknown/user.png`)
                if (data) {
                    setImageLink(data.publicUrl)
                    console.log(data.publicUrl);
                    console.log(imageLink);
                } else {
                    console.log(error);
                }
    }
    console.log(imageLink);
  return (
    <div>
        <button onClick={fetchImage}>Click</button>
    </div>
  )
}

export default Test;