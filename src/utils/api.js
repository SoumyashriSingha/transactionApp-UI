/**
 * API abstraction layer for backend integration.
 * Replace BASE_URL with your actual backend REST endpoint.
 */
const BASE_URL = 'http://localhost:8080';

/**
 * Generic fetch wrapper to handle JSON formatting and common errors
 */
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer YOUR_AUTH_TOKEN`, // Uncomment when you have auth
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }

    // Note: Some endpoints might return empty bodies, handle accordingly
    return await response.json().catch(() => ({}));
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
};

/**
 * Endpoints
 */

// Submit a new dispute
export const submitDisputeAPI = async (payload) => {
  return await fetchAPI('/dispute', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
};

// Fetch all transactions for the current user
export const fetchTransactionsAPI = async (userId) => {
  return await fetchAPI(`/transactions?user_id=${userId}`, {
    method: 'GET'
  });
};

// Fetch all disputes to track status dynamically
export const fetchDisputesAPI = async (userId) => {
  return await fetchAPI(`/disputes?user_id=${userId}`, {
    method: 'GET'
  });
};

/**
 * Evidence (Image) Upload Helper
 * Uses multipart/form-data to securely upload the local React Native image 
 * to the backend storage or cloud.
 */
export const uploadEvidenceAPI = async (imageUri) => {
  // Infer file type from path or default to jpeg
  const fileType = imageUri.split('.').pop() || 'jpeg';

  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    name: `evidence.${fileType}`,
    type: `image/${fileType === 'jpg' ? 'jpeg' : fileType}`,
  });

  try {
    const response = await fetch(`${BASE_URL}/upload-evidence`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) throw new Error('Failed to upload image');
    return await response.json(); // e.g. returns the remote { evidence_url: "..." }
  } catch (error) {
    console.error('API Error [uploadEvidenceAPI]:', error.message);
    throw error;
  }
};
