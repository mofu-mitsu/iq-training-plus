const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

code = code.replace(/<\/div>\n                      \) : null\}/g, '</div>\n                      )}');

// now target specifically line 970
// the sequence is:
/*
                          >
                            決定
                          </button>
                        </div>
                      )}
                  </div>
                )}
*/
const target = `                            決定
                          </button>
                        </div>
                      )}`;
const replace = `                            決定
                          </button>
                        </div>
                      ) : null}`;

code = code.replace(target, replace);
fs.writeFileSync('components/TrainingModule.tsx', code);
