/**
 * @typedef {'admin' | 'doctor' | 'nurse' | 'receptionist' | 'pharmacist' | 'lab_technician' | 'accountant'} UserRole
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {UserRole} role
 * @property {string=} avatar
 * @property {string=} department
 */

/**
 * @typedef {Object} Patient
 * @property {string} id
 * @property {string} patientId
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} dateOfBirth
 * @property {'male' | 'female' | 'other'} gender
 * @property {string} phone
 * @property {string=} email
 * @property {string} address
 * @property {string} emergencyContact
 * @property {string=} bloodGroup
 * @property {string[]=} allergies
 * @property {'opd' | 'ipd'} type
 * @property {string=} admissionDate
 * @property {string=} roomNumber
 * @property {'active' | 'discharged' | 'critical'} status
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Appointment
 * @property {string} id
 * @property {string} patientId
 * @property {string} patientName
 * @property {string} doctorId
 * @property {string} doctorName
 * @property {string} department
 * @property {string} date
 * @property {string} time
 * @property {'scheduled' | 'completed' | 'cancelled' | 'in-progress'} status
 * @property {'consultation' | 'follow-up' | 'emergency'} type
 * @property {string=} notes
 */

/**
 * @typedef {Object} Department
 * @property {string} id
 * @property {string} name
 * @property {string} head
 * @property {number} staffCount
 * @property {string=} description
 */

/**
 * @typedef {Object} StatsCard
 * @property {string} title
 * @property {string | number} value
 * @property {string=} change
 * @property {'positive' | 'negative' | 'neutral'} changeType
 * @property {import('react').ReactNode} icon
 * @property {'primary' | 'success' | 'warning' | 'info'} variant
 */
