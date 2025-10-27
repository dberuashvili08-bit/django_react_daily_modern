from rest_framework.test import APITestCase
from rest_framework import status

class TaskApiModernTests(APITestCase):
    def test_crud_and_filter(self):
        list_url = '/api/tasks/'
        # create two tasks
        r1 = self.client.post(list_url, {'title':'A'}, format='json')
        r2 = self.client.post(list_url, {'title':'B', 'is_completed': True}, format='json')
        self.assertEqual(r1.status_code, status.HTTP_201_CREATED)
        self.assertEqual(r2.status_code, status.HTTP_201_CREATED)
        a_id = r1.data['id']
        # list all
        self.assertEqual(self.client.get(list_url).status_code, 200)
        # filter active
        self.assertEqual(self.client.get(list_url+'?status=active').status_code, 200)
        # toggle
        self.assertEqual(self.client.patch(f'/api/tasks/{a_id}/', {'is_completed': True}, format='json').status_code, 200)
        # delete
        self.assertEqual(self.client.delete(f'/api/tasks/{a_id}/').status_code, 204)
