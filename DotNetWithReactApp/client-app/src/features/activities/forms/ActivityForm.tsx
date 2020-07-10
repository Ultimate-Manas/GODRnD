import React, { useState, FormEvent } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
//import { act } from 'react-dom/test-utils'
import { v4 as uuid } from 'uuid';
interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
}

const ActivityForm: React.FC<IProps> =
    ({ setEditMode, activity: initialActivity, createActivity, editActivity }) => {
        const initializeForm = () => {
            if (initialActivity) {
                return initialActivity;
            }
            else {
                return {
                    id: '',
                    title: '',
                    category: '',
                    description: '',
                    date: '',
                    city: '',
                    venue: ''
                }
            }
        };

        const [activity, setActivity] = useState<IActivity>(initializeForm);

        const handleSubmit = () => {
            if (activity.id.length === 0) {
                let newActivity = {
                    ...activity,
                    id: uuid()
                }
                createActivity(newActivity);
            }
            else {
                editActivity(activity);
            }
        }

        const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = event.currentTarget;
            console.log(event.currentTarget.value);
            setActivity({ ...activity, [name]: value });
        }

        return (
            <Segment clearing>
                <Form onSubmit={handleSubmit}>
                    <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                    <Form.TextArea placeholder='Description' rows={2} value={activity.description} name='description' onChange={handleInputChange} />
                    <Form.Input placeholder='Category' value={activity?.category} name='category' onChange={handleInputChange} />
                    <Form.Input placeholder='Date' type='date' value={activity?.date} name='date' onChange={handleInputChange} />
                    <Form.Input placeholder='City' value={activity?.city} name='city' onChange={handleInputChange} />
                    <Form.Input placeholder='Venue' value={activity?.venue} name='venue' onChange={handleInputChange} />
                    <Button floated='right' positive content='Submit' type='submit' />
                    <Button floated='right' onClick={() => setEditMode(false)} content='Cancel' type='button' />
                </Form>
            </Segment>
        )
    }

export default ActivityForm