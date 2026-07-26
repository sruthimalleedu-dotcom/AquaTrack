-- =====================================================
-- Create Property Registration Requests Table
-- =====================================================

CREATE TABLE property_registration_requests (

    id BIGSERIAL PRIMARY KEY,

    company_name VARCHAR(200) NOT NULL,

    contact_person_name VARCHAR(150) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    phone VARCHAR(15) NOT NULL,

    property_type VARCHAR(50) NOT NULL,

    number_of_apartments INTEGER NOT NULL,

    address VARCHAR(500) NOT NULL,

    city VARCHAR(100) NOT NULL,

    state VARCHAR(100) NOT NULL,

    pincode VARCHAR(10) NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',

    remarks VARCHAR(500),

    created_at TIMESTAMP NOT NULL,

    updated_at TIMESTAMP NOT NULL

);