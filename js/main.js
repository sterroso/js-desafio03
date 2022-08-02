const DEFAULT_STORAGE_TYPE = 'sessionStorage';

const settingsForm = document.getElementById('test-settings');

const userFirstNameField = document.getElementById('user-first-name');

const userLastNameField = document.getElementById('user-last-name');

const testLevelField = document.getElementsByName('test-level');

const testNumberOfQuestionsField = document.getElementById('test-number-of-questions');

settingsForm.addEventListener('submit', event => {
    let userFirstName = userFirstNameField.value;
    let userLastName = userLastNameField.value;
    let testLevel = Array.from(testLevelField).find(element => element.checked).id;
    let testNumberOfQuestions = testNumberOfQuestionsField.value;

    let testSettings = {
        'userFirstName': userFirstName,
        'userLastName': userLastName,
        'testLevel': testLevel,
        'testNumberOfQuestions': testNumberOfQuestions,
    }

    saveRecord('testSettings', JSON.stringify(testSettings), DEFAULT_STORAGE_TYPE);

    alert(loadRecord('testSettings'));
});

/**
 * Verifica que esté disponible un tipo de almacenamiento (localStorage | sessionStorage).
 * 
 * @param {string} type El tipo de storage que se quiere verificar: localStorage | sessionStorage
 * @returns true si está disponible, false de lo contrario.
 */
 const storageAvailable = type => {
    // El objeto donde se guarda la referencia al almacenamiento.
    let storage;

    // Intenta hacer una prueba de almacenamiento.
    try {
        storage = window[type];
        const x = '__storageTest__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch(e) {
        return e instanceof DOMException && (
            // No Firefox
            e.code == 22 ||
            // Firefox
            e.code == 1014 ||
            // Campo 'nombre' para casos en que el código de error
            // no se especifica.
            // No Firefox
            e.name == 'QuotaExceededError' ||
            // Firefox
            e.name == 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // reporta error de Cuota Excedida  solo si ya hay datos guardados
            (storage && storage.length !== 0);
    }
}

/**
 * Guarda un objeto (registro), identificado por la llave (key) proporcionada,
 * en el almacenamiento de Sesión (sessionStorage).
 * 
 * @param {string} key La llave que identificará al objeto (registro) guardado.
 * @param {Object} record Registro de puntuación de un usuario.
 * @param {string} storageType El tipo de almacenamiento en el que se guardará
 * el objeto (registro).
 * @returns true si se guardó el objeto (registro), false de lo contrario.
 */
const saveRecord = (key, record, storageType) => {
    if (storageAvailable(storageType)) {
        let storage = window[storageType];
        storage.setItem(key, JSON.stringify(record));
    } else {
        alert(`No está disponible el almacenamiento ${storageType}.`);
        return false;
    }

    return true;
};

/**
 * Devuelve un objeto, del almacenamiento de Sesión (sessionStorage), identificado con la
 * llave proporcionada.
 * 
 * @param {string} key Llave del registro que se desea cargar.
 * @returns Un objeto, del almacenamiento de Sesión (sessionStorage), identificado por la 
 * llave proporcionada. Devuelve nulo (null) si no existe un objeto identificado con la llave 
 * proporcionada o no está disponible el almacenamiento de Sesión.
 */
const loadRecord = key => {
    if (storageAvailable('sessionStorage')) {
        return sessionStorage.getItem(key);
    }

    return null;
};