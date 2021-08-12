CREATE SCHEMA celine
    AUTHORIZATION postgres;

CREATE TABLE celine.user (
	username character varying(25) NOT NULL PRIMARY KEY,
    password character varying(255) NOT NULL,
	email character varying(100),
    role character varying(10) NOT NULL,
    created timestamp with time zone DEFAULT now()
);

CREATE TABLE celine.employee (
    employee_id character varying(10) PRIMARY KEY,
	username character varying(25) NOT NULL,
	fullname character varying(255) NOT NULL,
    phone_number character varying(20),
	address text,
    created timestamp with time zone DEFAULT now(),
	created_by character varying(25),
    updated timestamp with time zone,
	updated_by character varying(25)
);

CREATE TABLE celine.customer (
    customer_id character varying(10) PRIMARY KEY,
	username character varying(25),
	fullname character varying(255) NOT NULL,
	phone_number character varying(20),
	email character varying(100),
	id_number character varying(50),
	gender character varying(20),
	address text,
    created timestamp with time zone DEFAULT now(),
	created_by character varying(25),
    updated timestamp with time zone,
	updated_by character varying(25)
);

CREATE TABLE celine.service (
    service_id character varying(10) PRIMARY KEY,
	service_name character varying(100) NOT NULL,
	thumbnail text,
    description text,
	price bigint NOT NULL,
    created timestamp with time zone DEFAULT now(),
	created_by character varying(25),
    updated timestamp with time zone,
	updated_by character varying(25)
);

CREATE TABLE celine.order (
    order_id character varying(10) PRIMARY KEY,
	employee_id character varying(10) NOT NULL,
	customer_id character varying(10) NOT NULL,
	schedule_id bigint NOT NULL,
	booking_date timestamp with time zone NOT NULL,
	is_down_payment boolean,
	customer_account_name character varying(100) NOT NULL,
	customer_account_number character varying(200) NOT NULL,
	customer_payment_nominal bigint NOT NULL,
	transfer_evidence text,
	status character varying(20),
    created timestamp with time zone DEFAULT now(),
	created_by character varying(25),
    updated timestamp with time zone,
	updated_by character varying(25)
);

CREATE TABLE celine.schedule (
    schedule_id bigserial PRIMARY KEY,
	employee_id character varying(10) NOT NULL,
	schedule timestamp with time zone NOT NULL,
	status character varying(20),
    created timestamp with time zone DEFAULT now()
);

CREATE TABLE celine.order_detail (
    order_id character varying(10),
	service_id character varying(10),
	service_name character varying(100) NOT NULL,
	price bigint NOT NULL,
    created timestamp with time zone DEFAULT now(),
	PRIMARY KEY (order_id, service_id)
);
