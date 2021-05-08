CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) not null,
    password VARCHAR(255) not null,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    role_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE roles(
    id SERIAL PRIMARY KEY,
    role VARCHAR(50) not null
);

CREATE TABLE flats(
    id SERIAL,
    room VARCHAR(10) not null,
    tower VARCHAR(10) not null,
    size_in_sq_ft NUMERIC(2, 5),
    type VARCHAR(255) not null,
    floorplan TEXT,
);

CREATE TABLE flat_structures(
    id SERIAL PRIMARY KEY,
    space_id INTEGER,
    FOREIGN KEY (space_id) REFERENCES spaces(id),
    flat_id INTEGER,
    FOREIGN KEY (flat_id) REFERENCES flats(id)
)
    
CREATE TABLE spaces(
    id SERIAL,
    space VARCHAR(255) not null
);

CREATE TABLE subcontractors(
    id SERIAL,
    name VARCHAR(255) not null
);

CREATE TABLE features(
    id SERIAL PRIMARY KEY,
    feature VARCHAR(255) not null,
    space_id INTEGER,
    FOREIGN KEY (space_id) REFERENCES spaces(id),
    subcontractor_id INTEGER,
    FOREIGN KEY (subcontractor_id) REFERENCES subcontractors(id)
);

CREATE TABLE defects(
    id SERIAL PRIMARY KEY,
    issue VARCHAR(255) not null,
    feature_id INTEGER,
    FOREIGN KEY (feature_id) REFERENCES features(id)
);

CREATE TABLE records(
    id SERIAL PRIMARY KEY,
    date_of_inspection DATE not null,
    time_of_inspection DATE not null,
    due_date DATE,
    status VARCHAR(255) not null,
    description TEXT not null,
    defect_id INTEGER,
    FOREIGN KEY (defect_id) REFERENCES defects(id),
    flat_id INTEGER,
    FOREIGN KEY (flat_id) REFERENCES flats(id),
    user_inspector_id INTEGER,
    FOREIGN KEY (user_inspector_id) REFERENCES users(id)
);
