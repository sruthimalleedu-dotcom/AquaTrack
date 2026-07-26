CREATE TABLE alerts (

                        id BIGSERIAL PRIMARY KEY,

                        user_id BIGINT NOT NULL,

                        title VARCHAR(255) NOT NULL,

                        message VARCHAR(1000),

                        priority VARCHAR(20) NOT NULL,

                        is_read BOOLEAN DEFAULT FALSE,

                        created_at TIMESTAMP NOT NULL,

                        CONSTRAINT fk_alert_user
                            FOREIGN KEY (user_id)
                            REFERENCES users(id)
                            ON DELETE CASCADE
);