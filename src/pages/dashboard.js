import { useState, useEffect } from 'react';
import { successNotification, errorNotification } from '../components/notification';
import Header from '../components/header';
// axios
import axios from 'axios';

const Dashboard = () => {
    const [allTags, setAllTags] = useState([]);

    // Load tags when dashboard loads
    useEffect(() => {
        const process_tags = (tags) => {
            return tags.map((item) => 
                item['tags'].map((tag, index) => {
                    if (!item['group']['binary'] || index === 1)
                        return {value: tag['id'], label: tag['name'], groupId: item['group']['id']}
                    else
                        return {}
                }).filter((tag) => (Object.keys(tag).length != 0))
            ).flat();
        }

		axios.get('/api/tag_groups')
			.then(res => setAllTags(process_tags(res.data)))
			.catch(function (error) {
                errorNotification('Что-то пошло не так!');
                console.log(error.response);
			});
    }, []);

    return (
        <div className="dashboard-container">
            <Header allTags={allTags}/>
        </div>
    );
};

export default Dashboard;
