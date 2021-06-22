import {
  CLEAR_KAMBAM,
  GET_KAMBANS,
  GET_KAMBAM,
  ADD_KAMBAM,
  KAMBAM_ERROR,
  RENAME_KAMBAM,
  GET_TASK,
  ADD_TASK,
  RENAME_TASK,
  ARCHIVE_TASK,
  GET_CARD,
  ADD_CARD,
  EDIT_CARD,
  MOVE_CARD,
  ARCHIVE_CARD,
  DELETE_CARD,
  GET_ACTIVITY,
  ADD_MEMBER,
  MOVE_TASK,
  ADD_CARD_MEMBER,
  ADD_CHECKLIST_ITEM,
  EDIT_CHECKLIST_ITEM,
  COMPLETE_CHECKLIST_ITEM,
  DELETE_CHECKLIST_ITEM,
} from '../actions/types';

const initialState = {
  kambans: [],
  kambam: null,
  dashboardLoading: true,
  error: {},
};

export default function functionKambam(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_KAMBAM:
      return {
        ...state,
        kambam: null,
      };
    case GET_KAMBANS:
      return {
        ...state,
        kambans: payload,
        dashboardLoading: false,
      };
    case RENAME_KAMBAM:
    case GET_KAMBAM:
      return {
        ...state,
        kambam: { ...state.kambam, ...payload },
      };
    case ADD_KAMBAM:
      return {
        ...state,
        kambans: [payload, ...state.kambans],
      };
    case KAMBAM_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_TASK:
      return {
        ...state,
        kambam: {
          ...state.kambam,
          taskObjects: [...state.kambam.taskObjects, payload],
        },
      };
    case ADD_TASK:
      return {
        ...state,
        kambam: {
          ...state.kambam,
          tasks: [...state.kambam.tasks, payload._id],
        },
      };
    case ARCHIVE_TASK:
    case RENAME_TASK:
      return {
        ...state,
        kambam: {
          ...state.kambam,
          taskObjects: state.kambam.taskObjects.map((task) =>
            task._id === payload._id ? payload : task
          ),
        },
      };
    case GET_CARD:
      return {
        ...state,
        kambam: {
          ...state.kambam,
          cardObjects: [...state.kambam.cardObjects, payload],
        },
      };
    case ADD_CARD:
      return {
        ...state,
        kambam: {
          ...state.kambam,
          taskObjects: state.kambam.taskObjects.map((task) =>
            task._id === payload.taskId
              ? { ...task, cards: [...task.cards, payload.cardId] }
              : task
          ),
        },
      };
    case ADD_CHECKLIST_ITEM:
    case EDIT_CHECKLIST_ITEM:
    case COMPLETE_CHECKLIST_ITEM:
    case DELETE_CHECKLIST_ITEM:
    case ARCHIVE_CARD:
    case ADD_CARD_MEMBER:
    case EDIT_CARD:
      return {
        ...state,
        kambam: {
          ...state.kambam,
          cardObjects: state.kambam.cardObjects.map((card) =>
            card._id === payload._id ? payload : card
          ),
        },
      };
    case MOVE_CARD:
      return {
        ...state,
        kambam: {
          ...state.kambam,
          taskObjects: state.kambam.taskObjects.map((task) =>
            task._id === payload.from._id
              ? payload.from
              : task._id === payload.to._id
                ? payload.to
                : task
          ),
          cardObjects: state.kambam.cardObjects.filter(
            (card) => card._id !== payload.cardId || payload.to._id === payload.from._id
          ),
        },
      };
    case DELETE_CARD:
      return {
        ...state,
        kambam: {
          ...state.kambam,
          cardObjects: state.kambam.cardObjects.filter((card) => card._id !== payload),
          taskObjects: state.kambam.taskObjects.map((task) =>
            task.cards.includes(payload)
              ? { ...task, cards: task.cards.filter((card) => card !== payload) }
              : task
          ),
        },
      };
    case GET_ACTIVITY:
      return {
        ...state,
        kambam: {
          ...state.kambam,
          activity: payload,
        },
      };
    case ADD_MEMBER:
      return {
        ...state,
        kambam: {
          ...state.kambam,
          members: payload,
        },
      };
    case MOVE_TASK:
      return {
        ...state,
        kambam: {
          ...state.kambam,
          tasks: payload,
        },
      };
    default:
      return state;
  }
}
