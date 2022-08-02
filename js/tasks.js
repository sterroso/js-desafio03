/**
 * Clase User (Usuario): contiene la información del usuario: nombre(s) de pila
 * y apellido(s)
 */
class User {
    /**
     * Crea un objeto User (Usuario).
     * 
     * @param {string} firstName El/los nombre(s) de pila del Usuario.
     * @param {string} lastName El/los apellido(s) del Usuario.
     */
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    /**
     * Establece el/los nombre(s) de pila del Usuario.
     * 
     * @param {string} value El/los nombre(s) de pila del Usuario.
     * @returns true si se proporcionó un valor válido, false de lo contrario.
     */
    set firstName(value) {
        if (value !== null && value.trim()) {
            this._firstName = value.trim();
            return true;
        }

        return false;
    }

    /**
     * Devuelve el/los nombre(s) de pila del Usuario.
     * 
     * @returns Una cadena de texto que contiene el/los nombre(s) de pila del
     * Usiario. Devuelve una cadena vacía si no está definido.
     */
    get firstName() {
        if (this._firstName !== null) return this._firstName;

        return '';
    }

    /**
     * Establece el/los apellido(s) del usuario.
     * 
     * @param {string} value El/los apellido(s) del usuario.
     * @returns true si se proporcionó un valor válido, false de lo contrario.
     */
    set lastName(value) {
        if (value !== null && value.trim()) {
            this._lastName = value.trim();
            return true;
        }
    }

    /**
     * Devuelve el/los apellido(s) del usuario.
     * 
     * @returns Una cadena de texto que contiene el/los apellido(s) del Usuario.
     * Devuelve una cadena vacía si no está definido.
     */
    get lastName() {
        if (this._lastName !== null) return this._lastName;

        return '';
    }

    /**
     * Devuelve el nombre completo del Usuario.
     * 
     * @returns Una cadena de texto con el/los nombre(s) de pila y apellido(s) del Usuario concatenados.
     */
    toString() {
        return this.firstName.concat(' ', this.lastName);
    }
}

/**
 * Clase Question (Pregunta): una pregunta de aritmética para un Test (Examen)
 */
class Question {
    /**
     * Crea una pregunta para examen de acuerdo con el nivel de dificultad prporcionado.
     * 
     * @param {string} level El nivel de dificultad de la pregunta.
     */
    constructor(level) {
        this.level = level;
        this._userAnswer = null;
    }

    /**
     * Establece el nivel de dificultad de la pregunta. Si anteriormente ya se había 
     * establecido un nivel de dificultad para la pregunta, y el nuevo nivel de es 
     * diferente al anterior, también se cambia la pregunta y, por lo tanto, el resultado.
     * Si el valor proporcionado es válido, e igual al nivel anterior, la pregunta y el 
     * resultado no cambian, aún así devuelve true.
     * 
     * @param {string} value El nivel de dificultad de la pregunta.
     * @returns true si el valor proporcionado no es nulo y es válido, false de lo 
     * contrario. Utilice el método estático Test.getLevels() para obtener un arreglo 
     * (Array) con los niveles de dificultad válidos.
     */
    set level(value) {
        if (value !== null && Test.getLevels().find(element => element === value)) {
            if (value !== this._level) {
                this._level = value.trim().toLowerCase();
                
                this._levelSpecs = Test.getLevelSpecs(this.level);

                this.#generateNumbers();

                this.#generateCorrectAnswer();
            }

            return true;
        }

        return false;
    }

    /**
     * Devuelve el nivel de dificultad de la pregunta, si ya se había establecido con
     * anterioridad, de lo contrario devuelve una cadena de caracteres vacía.
     */
    get level() {
        if (this._level !== null) return this._level;

        return '';
    }

    /**
     * Establece la respuesta del usuario.
     * 
     * @param {Number} value La respuesta del usuario.
     */
    set userAnswer(value) {
        this._userAnswer = value;
    }

    /**
     * Devuelve la respuesta del usuario.
     */
    get userAnswer() {
        return this._userAnswer;
    }

    get symbol() {
        return this._symbol;
    }

    /**
     * Valida si la respuesta del usuario es correcta.
     * 
     * @returns true si la respuesta del usuario es correcta, false de lo contrario.
     */
    isCorrect() {
        return this._userAnswer === this._correctAnswer;
    }

    /**
     * Genera los números (operandos) con los que se calcula la pregunta.
     * 
     * @param {string} level El nivel de dificultad.
     */
    #generateNumbers() {
        this._numbers = [
            Math.floor(Math.random() * (this._levelSpecs.maxNumber + 1 - this._levelSpecs.minNumber)) + this._levelSpecs.minNumber,
            Math.floor(Math.random() * (this._levelSpecs.maxNumber + 1 - this._levelSpecs.minNumber)) + this._levelSpecs.minNumber
        ];
    }

    #generateCorrectAnswer() {
        let functionIndex = Math.floor(Math.random() * (this._levelSpecs.tasks.length));
        console.debug(`functionIndex: ${functionIndex}`);
        this._function = this._levelSpecs.tasks[functionIndex];
        console.debug(`this._function: ${this._function}`);

        switch(this._function) {
            case 'sum':
                this._functionName = 'Suma';
                this._symbol = '+';
                this._correctAnswer = this._numbers[0] + this._numbers[1];
                break;
            case 'subtraction':
                this._functionName = 'Resta';
                this._symbol = '-';
                this._correctAnswer = this._numbers[0] - this._numbers[1];
                break;
            case 'multiplication':
                this._functionName = 'Multiplicación';
                this._symbol = '\u{00D7}';
                this._correctAnswer = this._numbers[0] * this._numbers[1];
                break;
            case 'division':
                this._functionName = 'División';
                this._symbol = '\u{00F7}';
                this._correctAnswer = this._numbers[0] / this._numbers[1];
                break;
            case 'intSquare':
                this._functionName = 'Cuadrado Entero';
                this._symbol = '\u{00B2}';
                this._correctAnswer = Math.pow(this._numbers[0], 2);
                break;
            default:
                this._functionName = 'Desconocido';
                this._correctAnswer = null;
        }
        console.debug(`this._correctAnswer: ${this._correctAnswer}`);
    }

    toString() {
        if (this._function !== 'intSquare') {
            return `${this._numbers[0]} ${this.symbol} ${this._numbers[1]}`;
        }
        
        return `${this._numbers[0]}${this._symbol}`;
    }
}

/**
 * Clase Test (Examen): contiene un examen de aritmética con preguntas aleatorias
 * de acuerdo con el nivel con que fue creado.
 */
class Test {
    // Niveles de dificultad de un examen de aritmética.
    static #LEVELS = {
        'easy': {
            'localName': 'Fácil',
            'minNumber': 2,
            'maxNumber': 9,
            'tasks': ['sum', 'subtraction'],
        },
        'medium': {
            'localName': 'Medio',
            'minNumber': 10,
            'maxNumber': 29,
            'tasks': ['sum', 'subtraction', 'multiplication'],
        },
        'hard': {
            'localName': 'Difícil',
            'minNumber': 30,
            'maxNumber': 49,
            'tasks': ['multiplication', 'intSquare'],
        }
    };

    // Número mínimo de preguntas de un Test (Examen)
    static #MIN_NUMBER_OF_QUESTIONS = 5;

    // Número máximo de preguntas de un Test (Examen)
    static #MAX_NUMBER_OF_QUESTIONS = 10;

    /**
     * Crea un objeto Test (Examen) con preguntas de acuerdo con el nivel de dificultad
     * indicado.
     * @param {string} level Nivel de dificultad para el Test (Examen)
     * @param {int} numberOfQuestions Número de preguntas para el Test (Examen)
     */
    constructor(level, numberOfQuestions, user) {
        this.level = level;
        this.numberOfQuestions = numberOfQuestions;
        this.user = user;
        this._questions = [];
        this.#generateQuestions();
    }

    /**
     * Establece el nivel de dificultad del Test (Examen).
     * 
     * @param {string} value El nivel de dificultad del Test (Examen)
     * @returns true si el valor proporcionado no es nulo y si existe un 
     * nivel de dificultad proporcionado, falso de lo contrario. 
     * Use el método estático getLevels() para obtener un arreglo (Array) 
     * con la lista de los niveles de dificultad disponibles.
     */
    set level(value) {
        if (Test.isValidLevel(value)) {
            this._level = value.trim().toLowerCase();
            this.#mapLevelName();
            return true;
        }

        return false;
    }

    /**
     * Devuelve el nivel de dificultad establecido para este Test (Examen).
     * @returns Una cadena de caracteres con el nivel de dificultad de este examen, si está
     * establecido. Devuelve una cadena vacía si no se ha establecido.
     */
    get level() {
        if (this._level !== null) return this._level;

        return '';
    }

    /**
     * Devuelve el nombre del nombre del nivel en el idioma local.
     */
    get levelName() {
        return this._levelName;
    }

    /**
     * Establece el número de preguntas para este Test (Examen)
     * 
     * @param {int} value El número de preguntas de este Test (Examen)
     * @returns true si se proporcionó un número de preguntas válido,
     * false de lo contrario.
     * Utilice los métodos estáticos getMinNumberOfQuestions() y getMaxNumberOfQuestions 
     * para obtener los valores mínimo y máximo del número de preguntas para un Test (Examen)
     */
    set numberOfQuestions(value) {
        if (Test.isValidNumberOfQuestions(value)) {
            this._numberOfQuestions = value;
            return true;
        }

        return false;
    }

    /**
     * Devuelve el número de preguntas para este Test (Examen)
     * 
     * @returns Un entero con el número de preguntas de este Test (Examen). Devuelve
     * 0 si no se han especificado el número de preguntas.
     */
    get numberOfQuestions() {
        if (this._numberOfQuestions !== null) return this._numberOfQuestions;

        return 0;
    }

    /**
     * Establece el usuario que toma el Test (Examen)
     * 
     * @param {User} value El usuario que toma el Test (Examen)
     */
    set user(value) {
        this._user = value;
    }

    /**
     * Devuelve el usuario que toma el Test (Examen)
     */
    get user() {
        return this._user;
    }

    /**
     * Devuelve las preguntas generadas automáticamente para este Test
     * (Examen), de acuderdo con el número de preguntas y nivel de 
     * dificultad especificados.
     */
    get questions() {
        return this._questions;
    }

    /**
     * Valida si el índice proporcionado es menor a la cantidad de preguntas del 
     * Test (Examen)
     * 
     * @param {int} index Índice de la pregunta.
     * @returns true si el índice proporcionado es menor a la cantidad de
     * preguntas del Test (Examen)
     */
    isValidQuestionIndex(index) {
        return index < this.questions.length;
    }

    /**
     * Establece la respuesta del usuario a la pregunta identificada en el índice.
     * 
     * @param {int} index Índice de la pregunta que se va a responder.
     * @param {Number} answer Respuesta a la pregunta.
     */
    setAnswerByQuestionIndex(index, answer) {
        if (this.isValidQuestionIndex(index)) {
            this.questions.userAnswer = answer;
        }
    }

    /**
     * Valida el nivel de dificultad proporcionado.
     * 
     * @param {string} level El nivel de dificultad a validar.
     * @returns true si el nivel de dificultad proporcionado es válido, falso de
     * lo contrario.
     */
    static isValidLevel(level) {
        return (
            // El argumento no es nulo,
            level !== null && 
            
            // El argumento está incluído en los niveles de dificultad establecidos.
            Test.getLevels().includes(level.trim().toLowerCase())
            );
    }

    /**
     * Valida el número de preguntas proporcionado.
     * 
     * @param {int} value El número de preguntas.
     * @returns true si el número de preguntas proporcionado es válido, falso de
     * lo contrario.
     */
    static isValidNumberOfQuestions(value) {
        return (
            // Debe proporcionar el argumento (no nulo).
            value !== null && 

            // No debe ser un NaN (Not a Number)
            !isNaN(value) && 

            // Debe ser un valor finito.
            isFinite(value) && 

            // Debe estar entre el mínimo y máximo permitido (inclusive).
            Test.#MIN_NUMBER_OF_QUESTIONS <= value <= Test.#MAX_NUMBER_OF_QUESTIONS
            );
    }

    /**
     * Devuelve un arreglo (Array) con los niveles de dificultad válidos.
     * 
     * @returns un arreglo (Array) de cadena de caracteres con los niveles de 
     * dificultad válidos para un Test (Examen).
     */
    static getLevels() {
        return Object.keys(Test.#LEVELS);
    }

    /**
     * Devuelve las especificaciones del nivel de dificultad proporcionado.
     * 
     * @param {string} level Nivel de dificultad.
     * 
     * @returns un objeto JSON con las especificaciones del nivel de dificultad 
     * proporcionado. Devuelve nulo (null) si el nivel de dificultad proporcionado 
     * no es válido.
     */
    static getLevelSpecs(level) {
        if (Test.isValidLevel(level)) {
            return Test.#LEVELS[level];
        }

        return null;
    }

    /**
     * Devuelve el número mínimo de preguntas que puede tener un Test (Examen)
     * 
     * @returns Un entero que indica el número mínimo de preguntas que puede
     * tener un Test (Examen).
     */
    static getMinNumberOfQuestions() {
        return Test.#MIN_NUMBER_OF_QUESTIONS;
    }

    /**
     * Devuelve el número máximo de preguntas que puede tener un Test (Examen)
     * 
     * @returns Un entero que indica el número máximo de preguntas que puede
     * tener un Test (Examen)
     */
    static getMaxNumberOfQuestions() {
        return Test.#MAX_NUMBER_OF_QUESTIONS;
    }

    /**
     * Genera las preguntas de acuerdo con el número de preguntas y nivel 
     * de dificultad especificados.
     */
    #generateQuestions() {
        for(let q = 0; q < this.numberOfQuestions; q++) {
            this._questions.push(new Question(this.level));
        }
    }

    #mapLevelName() {
        switch(this.level) {
            case 'easy':
                this._levelName = 'Fácil';
                break;
            case 'medium':
                this._levelName = 'Medio';
                break;
            case 'hard':
                this._levelName = 'Difícil';
                break;
            default:
                this._levelName = 'Desconocido';
        }
    }

    getCorrectAnswersCount() {
        return this.questions.filter(q => q.isCorrect()).length;
    }

    /**
     * Devuelve la cantidad de respuestas correctas contra el número total de preguntas
     * del Test (Examen)
     * 
     * @returns Una cadena de caracteres que indica el número de respuestas correctas y 
     * el número total de preguntas del examen (respuestasCorrectas/numeroDePreguntas)
     */
    getMarks() {
        return `${this.getCorrectAnswersCount()}/${this.numberOfQuestions}`
    }

    toString() {
        return `Examen de Aritmética. Nivel: ${this.levelName}. Número de preguntas: ${this.numberOfQuestions}. Respuestas correctas: ${this.getCorrectAnswersCount()}`;
    }
}

const DEFAULT_STORAGE_TYPE = 'localStorage';

const questionsContainer = document.getElementById('questions-container');

const marksContainer = document.getElementById('marks-container');

let testUser;

let test;

window.addEventListener('load', event => {
    let testSettings = JSON.parse(loadRecord('testSettings', DEFAULT_STORAGE_TYPE));

    testUser = new User(testSettings.userFirstName, testSettings.userLastName);
    test = new Test(testSettings.testLevel, testSettings.testNumberOfQuestions, testUser);

    generateTest(test);

    removeRecord('testSettings');
});

/**
 * Genera el contenido del examen en el documento html.
 * 
 * @param {Test} testObject Objeto Test (examen) a generar.
 */
const generateTest = testObject => {
    let userNameTitle = document.createElement('h2');
    userNameTitle.classList.add('user-name-title');
    userNameTitle.innerHTML = `Alumno: ${testObject.user.toString()}`;

    questionsContainer.appendChild(userNameTitle);

    let testForm = document.createElement('form');
    testForm.id = 'test-form';
    testForm.method = 'post';
    testForm.action = '#'

    testObject.questions.forEach((q, i) => {
        let questionFieldset = document.createElement('fieldset');
        questionFieldset.classList.add('question-fieldset');

        let questionFieldsetLegend = document.createElement('legend');
        questionFieldsetLegend.innerHTML = `Pregunta ${i + 1}`
        questionFieldset.appendChild(questionFieldsetLegend);

        let questionLabel = document.createElement('label');
        questionLabel.setAttribute('for', `question-${i + 1}`);
        questionLabel.classList.add('question-label');
        questionLabel.innerHTML = q.toString();
        questionFieldset.appendChild(questionLabel);

        let questionField = document.createElement('input');
        questionField.setAttribute('type', 'number');
        questionField.setAttribute('required', 'true');
        questionField.setAttribute('aria-required', 'true');
        questionField.setAttribute('id', `question-${i + 1}`);
        questionField.setAttribute('name', `question-${i + 1}`);
        questionFieldset.appendChild(questionField);

        testForm.appendChild(questionFieldset);
    });

    let submitContainer = document.createElement('div');
    submitContainer.classList.add('submit-container');

    let submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('value', 'Calificar');
    submitContainer.appendChild(submitButton);

    testForm.appendChild(submitContainer);

    testForm.addEventListener('submit', event => {
        let resultsFields = Array.from(testForm.getElementsByTagName('input'));
        console.log(resultsFields);

        testObject.questions.forEach((q, i) => {
            q.userAnswer = parseInt(resultsFields[i].value);
            console.debug(`${q}: ${q.userAnswer}`);
        });

        let marksTitle = document.createElement('h3');
        marksTitle.classList.add('marks-title');
        marksTitle.innerHTML = 'Resultados';
        marksContainer.appendChild(marksTitle);

        let marks = document.createElement('p');
        marks.classList.add('marks');
        marks.innerHTML = `${testObject}`;
        marksContainer.appendChild(marks);

        event.preventDefault();
    });
    
    questionsContainer.appendChild(testForm);
};

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
 * Devuelve un objeto, del almacenamiento proporcionado, identificado con la
 * llave proporcionada.
 * 
 * @param {string} key Llave del registro que se desea cargar.
 * @param {string} storageType Tipo de almacenamiento en el que se buscará el registro (objeto).
 * @returns Un objeto JSON, del tipo de almacenamiento proporcionado, identificado por la 
 * llave proporcionada. Devuelve nulo (null) si no existe un objeto identificado con la llave 
 * proporcionada o no está disponible el almacenamiento de Sesión.
 */
const loadRecord = (key, storageType) => {
    if (storageAvailable(storageType)) {
        let storage = window[storageType];
        return JSON.parse(storage.getItem(key));
    }

    return null;
};

/**
 * Elimina un registro, identificado con la llave proporcionada, del almacenamiento 
 * indicado.
 * 
 * @param {string} key Llave del registro a eliminar.
 * @param {string} storageType Tipo de almacenamiento del que se desea remover el registro
 */
const removeRecord = (key, storageType) => {
    if (storageAvailable(storageType)) {
        let storage = window[storageType];
        storage.removeItem(key);
    }
}