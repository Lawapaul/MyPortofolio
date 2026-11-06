export const securesignProject = {
  id: "securesign",
  name: "SecureSign — RSA-Based Digital Signature and File Integrity Verification System",
  shortName: "SecureSign",
  category: "Applied Cryptography & Cybersecurity",
  overview: "A cryptographic security application designed for asymmetric digital document signing, tamper detection, and cryptographic file integrity verification using the RSA algorithm and secure SHA hashing algorithms.",
  problemStatement: "In distributed digital communication, documents and files face interception, unauthorized modification, and repudiation risks without strong cryptographic proof of authenticity and integrity.",
  motivation: "Implement practical, end-to-end cryptographic workflows from theoretical mathematical foundations (asymmetric key pairs, modular exponentiation, message digests) into a usable software utility.",
  objectives: "Provide robust asymmetric key pair generation, generate tamper-proof digital signatures by encrypting document hashes with private keys, verify signatures using public keys, and immediately flag any bit-level tampering in signed files.",
  technologies: [
    "Python",
    "Cryptography Libraries",
    "RSA Algorithm (Asymmetric Cryptography)",
    "SHA-256 / Secure Hashing",
    "PKI Principles (Public Key Infrastructure)",
    "File System Operations"
  ],
  architecture: "Three-stage cryptographic architecture: 1) Key Management Engine: Generates mathematically paired RSA public and private key sets with configurable bit-lengths. 2) Signing Engine: Computes a cryptographic SHA-256 digest of the input document and encrypts the hash using the private key, creating a verifiable detached or embedded digital signature. 3) Verification Engine: Decrypts the signature using the sender's public key, recalculates the document's SHA hash, and verifies mathematical equivalence. If a single bit differs, verification fails.",
  workflow: "Document input -> SHA-256 hashing -> Private key encryption -> Digital signature creation -> Distribution -> Recipient verification: Signature decrypted with public key -> Recalculated hash compared -> Integrity confirmed or tampering alerted.",
  algorithms: [
    "RSA Asymmetric Encryption & Decryption",
    "SHA-256 Cryptographic Hash Function",
    "Modular Arithmetic & Primality Generation",
    "PKCS Standard Padding"
  ],
  models: [],
  datasets: [],
  preprocessing: "Binary file stream chunking and SHA-256 digest calculation.",
  trainingDetails: "Not applicable (Deterministic applied cryptography system).",
  evaluationMetrics: [
    "Cryptographic Verification Accuracy (100% mathematical guarantee)",
    "Tamper Detection Rate (100% bit-level detection)",
    "Key Generation & Signing Execution Latency"
  ],
  results: {
    signatureWorkflow: "Complete RSA-based digital signature generation and verification",
    integrityPipeline: "Reliable file integrity verification with immediate tamper detection",
    practicalApplication: "Successfully demonstrated real-world application of asymmetric cryptography"
  },
  individualContribution: "Designed cryptographic architecture, implemented RSA key generation, signing, and verification modules in Python, and built file integrity checking workflows.",
  challenges: "Properly managing private key security, preventing timing/side-channel issues, and handling arbitrary file sizes via chunked hashing.",
  limitations: "Focuses on direct key-based verification rather than an enterprise Certificate Authority (CA) hierarchical root trust chain.",
  futureImprovements: "Integration with X.509 certificates, hardware security module (HSM) support, and elliptic curve cryptography (ECDSA / Ed25519) alternatives.",
  completionStatus: "Completed system with public source code repository.",
  repositoryUrl: "https://github.com/Lawapaul/SecureSign-RSA-Based-Digital-Signature-and-File-Integrity-Verification-System",
  liveDemoUrl: null,
  relatedQuestions: [
    "What is SecureSign?",
    "How does SecureSign use the RSA algorithm?",
    "How does SecureSign verify file integrity and detect tampering?",
    "Where is the SecureSign repository?"
  ]
};

