def generate_iconduck_search_url(app_name):
    base_url = "https://www.iconduck.com/search?query="
    # Replace spaces with "+" for URL compatibility
    formatted_app_name = app_name.replace(" ", "+")
    search_url = base_url + formatted_app_name
    return search_url

if __name__ == "__main__":
    app_name = input("Enter the name of the app/program: ").strip()
    search_url = generate_iconduck_search_url(app_name)
    print(f"Search URL: {search_url}")
