export async function fetchGetJSON(url: string) {
  try {
    const data = await fetch(url).then((res) => res.json());
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw err;
  }
}

const throwError = (error: any) => {
  if (error instanceof Error) {
    throw new Error(error.message);
  }
  throw error;
};

export async function fetchPostJSON(url: string, data?: {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(data || {}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throwError(errorData);
    }

    return await response.json();
  } catch (err) {
    throwError(err);
  }
}
