import React from 'react';
import afraid from '../Images/afraid.jpg';
import solution from '../Images/solution.jpg';
import './About.css'; // Import CSS for custom styles

export default function About() {
    return (
        <div className="container" style={{ marginTop: '100px' }}>
            <div className="content">
                <div className="section">
                    <div className="text">
                        <h2>About ToDo</h2>
                        <p>
                            The MERN stack, consisting of MongoDB, Express.js, React.js, and Node.js, collaborates to build a straightforward ToDo app. MongoDB handles data storage, Express.js manages the backend, React.js powers the user interface, and Node.js supports server-side functionality. The app features user authentication, task management, and real-time updates, all within a responsive design. The MERN stack's seamless integration makes it an accessible and effective choice for developing a user-friendly ToDo CRUD application.
                        </p>
                    </div>
                    <div className="image-container">
                        <img src={afraid} alt="Don't worry" className="image" />
                    </div>
                </div>
                <div className="section">
                    <div className="image-container">
                        <img src={solution} alt="Organize your work" className="image" />
                    </div>
                    <div className="text">
                        <p>
                            A ToDo app plays a pivotal role in organizing and enhancing work life efficiency. By providing a centralized platform to list tasks, priorities become clear, fostering a sense of direction. This tool aids in time management, allowing users to allocate resources wisely and avoid procrastination. With the ability to categorize tasks and set deadlines, it instills a sense of accountability. Additionally, the satisfaction of ticking off completed items boosts motivation and provides a tangible record of accomplishments. In the fast-paced modern work environment, a ToDo app acts as a digital assistant, ensuring tasks are organized, priorities are met, and productivity is optimized.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
