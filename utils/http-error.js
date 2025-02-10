/**
 * Represents an HTTP error with a specific status code and message.
 *
 * @class
 * @extends {Error}
 */
class HttpError extends Error {

  /**
   * A frozen object containing standard HTTP status codes and their corresponding messages.
   *
   * @static
   * @constant {Object.<number, string>}
   */
  static messages = Object.freeze({
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Content Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    418: "I'm a teapot",
    421: 'Misdirected Request',
    422: 'Unprocessable Content',
    423: 'Locked',
    424: 'Failed Dependency',
    425: 'Too Early',
    426: 'Upgrade Required',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
    510: 'Not Extended',
    511: 'Network Authentication Required',
  });

  /**
   * Creates an instance of HttpError.
   *
   * @constructor
   * @param {number} code - The HTTP status code.
   * @param {string} [message] - Fallback message if the status code is not recognized.
   */
  constructor(code, message='Unknown Error') {
    super(HttpError.messages[code] ?? message);
    this.code = code;
  }

}
