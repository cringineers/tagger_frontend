import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { successNotification, errorNotification } from '../components/notification';
// react-select imports
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// axios
import axios from 'axios';


const animatedComponents = makeAnimated();

const Dashboard = () => {
    const [allTags, setAllTags] = useState([]);
    const [selTags, setSelTags] = useState([]);

    // Load tags when dashboard loads
    useEffect(() => {
        const process_tags = (tags) => {
            return tags.map((item) => 
                item['tags'].map((tag, index) => {
                    if (!item['group']['binary'] || index === 1)
                        return {value: tag['id'], label: tag['name']}
                    else
                        return {}
                }).filter((tag) => (Object.keys(tag).length != 0))
            ).flat();
        }

		axios.get('/api/tag_groups')
			.then(res => {
                setAllTags(process_tags(res.data));
			})
			.catch(function (error) {
                errorNotification('Что-то пошло не так!');
                console.log(error.response);
			});
    }, []);

    // Load data on tag selector change
    useEffect(() => {
        if (selTags.length === 0) return;
        
        const tagstring = selTags.map((item) => `tags=${item.value}`).join('&');
        axios.get(`/api/images/search?${tagstring}`, { params: {'page': 0, 'size': 40} })
			.then(res => {
                console.log(res);
			})
			.catch(function (error) {
                errorNotification('Что-то пошло не так!');
                console.log(error.response);
			});
    }, [selTags]);

    const handleLogout = e => {
    };

    return (
        <div className="dashboard-container">
            <div className="header">
                <a href="#" className="header-logo"><img src="logo.svg" alt="brand" /></a>

                <div className="header-tag-selector">
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={allTags}
                        onChange={setSelTags}
                    />
                </div>

                <div className="header-logout">
                    <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={handleLogout}
                    >
                        Выйти
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
