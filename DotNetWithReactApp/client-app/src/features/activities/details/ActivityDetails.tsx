import React from 'react'
import { Card, Image, Icon, ButtonGroup, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { act } from 'react-dom/test-utils'

interface IProps {
    activity: IActivity;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDetails: React.FC<IProps> = ({ activity, setEditMode, setSelectedActivity }) => {
    return (
        <Card>
            <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths={2}>
                    <Button basic color='blue' content='Edit' onClick={() => setEditMode(true)} />
                    <Button basic color='grey' content='Cancel' onClick={() => setSelectedActivity(null)} />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}

export default ActivityDetails