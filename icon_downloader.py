def generate_iconduck_search_url(app_name):
    """
    Generates a search URL for Iconduck based on the app name.

    Parameters:
    app_name (str): The name of the app/program.

    Returns:
    str: The formatted search URL.
    """
    base_url = "https://www.iconduck.com/search?query="
    # Replace spaces with "+" for URL compatibility
    formatted_app_name = app_name.replace(" ", "+")
    search_url = base_url + formatted_app_name
    return search_url

if __name__ == "__main__":
    try:
        app_name = input("Enter the name of the app/program: ").strip()
        if not app_name:
            raise ValueError("App name cannot be empty.")
        search_url = generate_iconduck_search_url(app_name)
        print(f"Search URL: {search_url}")
    except ValueError as e:
        print(f"Error: {e}")
