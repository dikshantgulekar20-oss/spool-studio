-- Move rows stuck in 'processing' back to 'uploaded' so they can advance uploaded -> ready_for_review.
UPDATE "content_assets" SET "status" = 'uploaded' WHERE "status" = 'processing';
