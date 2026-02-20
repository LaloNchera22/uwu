from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        print("Navigating to app...")
        try:
            page.goto("http://localhost:8081", timeout=60000)
        except Exception as e:
            print(f"Error navigating: {e}")
            browser.close()
            return

        # Wait for the app to load
        print("Waiting for app to load...")
        try:
            # Wait for a known element, e.g., the Home tab or similar
            # Expo Router web often has a root div
            page.wait_for_load_state("networkidle")

            # Check if we are on home
            # The home tab has title "Home"
            # page.wait_for_selector("text=Home", timeout=60000)
        except Exception as e:
            print(f"Error waiting for home: {e}")
            page.screenshot(path="debug_load_fail.png")
            browser.close()
            return

        # Click on the Profile tab
        print("Clicking Profile tab...")
        try:
            # The tab bar usually has text labels.
            # Depending on how react-navigation renders on web, it might be a link or button
            profile_link = page.get_by_role("link", name="Profile")
            if profile_link.count() > 0:
                profile_link.click()
            else:
                # Fallback to text search
                page.click("text=Profile")

            # Wait for Profile content to load
            page.wait_for_selector("text=Mi Perfil", timeout=10000)

            # Take screenshot
            print("Taking screenshot...")
            page.screenshot(path="profile_screenshot.png")

        except Exception as e:
            print(f"Error interacting: {e}")
            page.screenshot(path="debug_interact_fail.png")

        browser.close()

if __name__ == "__main__":
    run()
