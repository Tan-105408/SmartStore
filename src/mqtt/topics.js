
export const ROOT = "smartstore01";

export const TOPICS = {
  temp: `${ROOT}/sensor/temp`,
  humidity: `${ROOT}/sensor/humidity`,
  lightLevel: `${ROOT}/sensor/light`,
  motion: `${ROOT}/sensor/motion`,

  doorStatus: `${ROOT}/status/door`,
  lightStatus: `${ROOT}/status/light`,
  alarmStatus: `${ROOT}/status/alarm`,
  online: `${ROOT}/status/online`,

  doorCmd: `${ROOT}/cmd/door`,
  lightCmd: `${ROOT}/cmd/light`,
  alarmCmd: `${ROOT}/cmd/alarm`,
  modeCmd: `${ROOT}/cmd/mode`,
};