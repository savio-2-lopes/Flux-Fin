import React from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Material UI 
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// Card e Kambam
import { archiveTask } from '../../actions/kambam';

const ArchivedTasks = () => {
  const taskObjects = useSelector((state) => state.kambam.kambam.taskObjects);
  const dispatch = useDispatch();
  const onSubmit = async (taskId) => {
    dispatch(archiveTask(taskId, false));
  };

  return (
    <div>
      <List>
        {taskObjects
          .filter((task) => task.archived)
          .map((task, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={task.title}
              />
              <Button
                onClick={() => onSubmit(task._id)}
              >
                Mover para Tasks
              </Button>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default ArchivedTasks;