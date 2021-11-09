import React from 'react'

const About = () => {
    return (
        <div className="aboutBox container bg-dark">
            <div className="accordion p-3" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button  collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            About the App
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <p>This is a Note App where anyone can -</p>
                            <ul>
                                <li>Store there notes</li>
                                <li>Edit there notes</li>
                                <li>Delte there notes</li>
                            </ul>
                            <p>With some unique features -</p>
                            <ul>
                                <li>Adding notes with tags</li>
                                <li>Differentiating notes with respect to tags</li>
                                <li>Searching notes according to headings and descriptions</li>
                                <li>Archive notes, Archived notes can be found on clicking MyNotes</li>
                                <li>Pin notes</li>
                                <li>Full view mode on one click</li>
                                <li>Just one click copy button for whole note</li>
                            </ul>
                            <p><strong>Your notes is safe with us, only you can access them !</strong></p>

                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            About the maker
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <p>Made with dedication by Nitish Bhardwaj</p>
                            <p>Contact me at -</p>
                            <ul>
                                <li>nitishb073@gmail.com</li>
                                <li>8221065277</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            Future insights
                        </button>
                    </h2>
                    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <ul>
                                <li>Adding new note with timelimit after that time note will be deleted automatically</li>
                                <li>Alarm with notes </li>
                                <li>Hover notes to show other options for desktops and no change for mobiles</li>
 
                            </ul>
                            <p>Contact me in case of any query, or any suggestion of new feature</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About