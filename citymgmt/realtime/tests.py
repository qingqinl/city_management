from django.test import SimpleTestCase

# Create your tests here.

class SimpleTests(SimpleTestCase):
    def test_home_page_status(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

    def test_real_time_pollution_page_status(self):
        response = self.client.get('/pollution/')
        self.assertEqual(response.status_code, 200)