import React from 'react'
import Footer from './Components/Footer'

const HealtthCornar = () => {
    return (
        <div>
            <div className="container" style={{ marginTop: '25vh' }}>
                <h2>Health Blogs</h2>
                <hr />
                <div className="row my-4">
                    <div className="col-5">
                        <img src="./blogs/blog1.jpg" alt="blog1" style={{ width: '30vw' }} />
                    </div>
                    <div className="col-7">
                        <b>Diseases & Conditions</b>
                        <h3>Harvard Health Ad Watch: An IV treatment for thyroid eye disease Published </h3>
                        <span>Published June 5, 2023</span>
                        <br />
                        <p className='fs-5'>
                            An ad for a medication to treat thyroid eye disease accurately describes the symptoms of the condition , but as is common with such ads it does not discuss other possible treatment options, or other information that people should be aware of.
                        </p>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-5">
                        <img src="./blogs/blog2.jpg" alt="blog2" style={{ width: '30vw' }} />
                    </div>
                    <div className="col-7">
                        <b>Child & Teen Health</b>
                        <h3>Play helps children practice key skills and build their strengths </h3>
                        <span>Published June 7, 2023</span>
                        <br />
                        <p className='fs-5'>
                            An ad for a medication to treat thyroid eye disease accurately describes the symptoms of the condition , but as is common with such ads it does not discuss other possible treatment options, or other information that people should be aware of.
                        </p>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-5">
                        <img src="./blogs/blog3.jpg" alt="blog3" style={{ width: '30vw' }} />
                    </div>
                    <div className="col-7">
                        <b>Heart Health</b>
                        <h3>Discrimination at work is linked to high blood pressure</h3>
                        <span>Published May 30, 2023</span>
                        <br />
                        <p className='fs-5'>
                            A new study finds that experiencing discrimination in the workplace—where many adults spend one-third of their time, on average—may be harmful to heart health.
                        </p>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-5">
                        <img src="./blogs/blog4.jpg" alt="blog4" style={{ width: '30vw' }} />
                    </div>
                    <div className="col-7">
                        <b>Staying Healthy</b>
                        <h3>Give praise to the elbow: A bending, twisting marvel</h3>
                        <span>Published May 24, 2023</span>
                        <br />
                        <p className='fs-5'>
                            Life would be extremely difficult for humans if we didn't have elbows, yet when it comes to joints we hear very little about them. So let's consider what the elbows do for us and why we should do all we can to protect them.</p>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-5">
                        <img src="./blogs/blog5.jpg" alt="blog4" style={{ width: '30vw' }} />
                    </div>
                    <div className="col-7">
                        <b>Diseases & Conditions</b>
                        <h3>The FDA relaxes restrictions on blood donation</h3>
                        <span>Published May 19, 2023</span>
                        <br />
                        <p className='fs-5'>
                        While the FDA rules for blood donation were revised twice in the last decade, one group — men who have sex with men — continued to be turned away from donating. Now new, evidence-based FDA rules will focus on individual risk rather than groupwide restrictions.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HealtthCornar