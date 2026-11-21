<?php
/**
 * NIELIT Agartala Full-Stack Heritage - Contact Bridge Endpoint
 * Developed by Deepjoy Bhowmik (NIELIT Full-Stack Web Development Intern, 2024-2025)
 * 
 * Provides secure server-side message ingestion, sanitization, and structured JSON delivery.
 */

header("Content-Type: application/json; charset=UTF-8");
header("X-Powered-By: NIELIT-FullStack-Bridge/Deepjoy-Bhowmik");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method Not Allowed. Use POST."]);
    exit;
}

$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid JSON payload."]);
    exit;
}

$name = filter_var(trim($data['name'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$message = filter_var(trim($data['body'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);

if (empty($name) || !$email || empty($message)) {
    http_response_code(422);
    echo json_encode([
        "status" => "validation_failed",
        "errors" => [
            "name" => empty($name) ? "Name is required" : null,
            "email" => !$email ? "A valid email is required" : null,
            "body" => empty($message) ? "Message body is required" : null
        ]
    ]);
    exit;
}

// In production, persists to MySQL or MongoDB
http_response_code(200);
echo json_encode([
    "status" => "success",
    "timestamp" => date("c"),
    "developer" => "Deepjoy Bhowmik (NIELIT Certified)",
    "message" => "Contact transmission verified and processed securely via PHP bridge."
]);
