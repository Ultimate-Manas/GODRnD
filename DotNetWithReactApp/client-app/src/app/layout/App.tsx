import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashborad from "../../features/activities/dashboard/ActivityDashborad";
import agents from "../api/agents";
import { LoadingComponent } from "./LoadingComponent";
import { Route } from "react-router-dom";
import { HomePage } from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/forms/ActivityForm";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id == id)[0]);
  };

  const handleOpenOrCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    agents.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };

  const handleEditActivity = (activity: IActivity) => {
    agents.Activities.update(activity).then(() => {
      setActivities([
        ...activities.filter((a) => a.id != activity.id),
        activity,
      ]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };

  const handleDeleteActivity = (id: string) => {
    if (window.confirm("Are you sure to delete ?")) {
      agents.Activities.delete(id).then(() => {
        setActivities([...activities.filter((a) => a.id != id)]);
      });
    }
  };

  useEffect(() => {
    agents.Activities.list()
      .then((response) => {
        let activities: IActivity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split("T")[0];
          activities.push(activity);
        });
        setActivities(activities);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content="Loading activities..." />;

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenOrCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        {/* <Route path='/' component={HomePage} />
        <Route path='/activities' component={ActivityDashborad} />
        <Route path='/createactivity' component={ActivityForm} /> */}

        <ActivityDashborad
          activities={activities}
          selectActivity={handleSelectedActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
