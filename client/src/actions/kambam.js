import axios from 'axios';
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
} from './types';

const config = {
  headers: { 'Content-Type': 'application/json', },
};

/* Listar kambam */

export const getKambans = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_KAMBAM });
    const res = await axios.get('/kambans');
    dispatch({ type: GET_KAMBANS, payload: res.data, });
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/* Exibindo kambam */

export const getKambam = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/kambans/${id}`);
    if (res) {
      axios.defaults.headers.common['kambamId'] = id;
    } else {
      delete axios.defaults.headers.common['kambamId'];
    }
    dispatch({
      type: GET_KAMBAM,
      payload: { ...res.data, taskObjects: [], cardObjects: [] },
    });
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/* Adicionar task */

export const addKambam = (formData, history) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);
    const res = await axios.post('/kambans', body, config);
    dispatch({
      type: ADD_KAMBAM,
      payload: res.data,
    });
    history.push(`/kambam/${res.data._id}`);
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/* Renomear task */

export const renameKambam = (kambamId, formData) => async (dispatch) => {
  try {
    const res = await axios.patch(`/kambans/rename/${kambamId}`, formData, config);
    dispatch({
      type: RENAME_KAMBAM,
      payload: res.data,
    });
    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      },
    });
  }
};

/* Exibir kanbam */

export const getTask = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/tasks/${id}`);
    dispatch({
      type: GET_TASK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      },
    });
  }
};

/* Adicionar kanbam */

export const addTask = (formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);
    const res = await axios.post('/tasks', body, config);
    dispatch({
      type: ADD_TASK,
      payload: res.data,
    });
    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      },
    });
  }
};

/* Renomear kanbam */

export const renameTask = (taskId, formData) => async (dispatch) => {
  try {
    const res = await axios.patch(`/tasks/rename/${taskId}`, formData, config);
    dispatch({
      type: RENAME_TASK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      },
    });
  }
};

/* Arquivar/Desarquivar Kanbam */

export const archiveTask = (taskId, archive) => async (dispatch) => {
  try {
    const res = await axios.patch(`/tasks/archive/${archive}/${taskId}`);
    dispatch({
      type: ARCHIVE_TASK,
      payload: res.data,
    });
    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      },
    });
  }
};

/* Listar card */

export const getCard = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/cards/${id}`);
    dispatch({
      type: GET_CARD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      },
    });
  }
};

/* Adicionar card */

export const addCard = (formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);
    const res = await axios.post('/cards', body, config);
    dispatch({
      type: ADD_CARD,
      payload: res.data,
    });
    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      },
    });
  }
};

/* Editar card */

export const editCard = (cardId, formData) => async (dispatch) => {
  try {
    const res = await axios.patch(`/cards/edit/${cardId}`, formData, config);
    dispatch({
      type: EDIT_CARD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      },
    });
  }
};

/* Mover card */

export const moveCard = (cardId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);
    const res = await axios.patch(`/cards/move/${cardId}`, body, config);
    dispatch({
      type: MOVE_CARD,
      payload: res.data,
    });
    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/* Arquivar/Desarquivar card */

export const archiveCard = (cardId, archive) => async (dispatch) => {
  try {
    const res = await axios.patch(`/cards/archive/${archive}/${cardId}`);
    dispatch({
      type: ARCHIVE_CARD,
      payload: res.data,
    });
    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/* Deletar card */

export const deleteCard = (taskId, cardId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/cards/${taskId}/${cardId}`);
    dispatch({
      type: DELETE_CARD,
      payload: res.data,
    });
    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/* Listar atividades */

export const getActivity = () => async (dispatch) => {
  try {
    const kambamId = axios.defaults.headers.common['kambamId'];
    const res = await axios.get(`/kambans/activity/${kambamId}`);
    dispatch({
      type: GET_ACTIVITY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/* Adicionar membro */

export const addMember = (userId) => async (dispatch) => {
  try {
    const res = await axios.put(`/kambans/addMember/${userId}`);
    dispatch({
      type: ADD_MEMBER,
      payload: res.data,
    });
    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/* Mover task */

export const moveTask = (taskId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);
    const res = await axios.patch(`/tasks/move/${taskId}`, body, config);
    dispatch({
      type: MOVE_TASK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/* Adicionar membro ao card */

export const addCardMember = (formData) => async (dispatch) => {
  try {
    const { add, cardId, userId } = formData;
    const res = await axios.put(`/cards/addMember/${add}/${cardId}/${userId}`);
    dispatch({
      type: ADD_CARD_MEMBER,
      payload: res.data,
    });
    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/* Adicionar item na checklist */

export const addChecklistItem = (cardId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);
    const res = await axios.post(`/checklists/${cardId}`, body, config);
    dispatch({
      type: ADD_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/* Editar item da checklist */

export const editChecklistItem = (cardId, itemId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);
    const res = await axios.patch(`/checklists/${cardId}/${itemId}`, body, config);
    dispatch({
      type: EDIT_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Complete/Não completado item da checklist

export const completeChecklistItem = (formData) => async (dispatch) => {
  try {
    const { cardId, complete, itemId } = formData;
    const res = await axios.patch(`/checklists/${cardId}/${complete}/${itemId}`);
    dispatch({
      type: COMPLETE_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/* Deletar checklist dos itens */

export const deleteChecklistItem = (cardId, itemId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/checklists/${cardId}/${itemId}`);
    dispatch({ type: DELETE_CHECKLIST_ITEM, payload: res.data, });
  } catch (err) {
    dispatch({
      type: KAMBAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};