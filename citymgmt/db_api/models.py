# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class BikeAvailability(models.Model):
    index_id = models.IntegerField(primary_key=True, blank=False, null=False)
    timestamp = models.TextField(blank=False, null=False)
    number = models.FloatField(blank=False, null=False)
    name = models.TextField(blank=False, null=False)
    lat = models.FloatField(blank=False, null=False)
    lng = models.FloatField(blank=False, null=False)
    bike_stands = models.FloatField(blank=False, null=False)
    available_bike_stands = models.FloatField(blank=False, null=False)
    available_bikes = models.FloatField(blank=False, null=False)

    def __srt__(self):
        return '{} by {}'.format(self.index_id, self.timestamp, self.number, self.name, self.lat, self.lng, self.bike_stands, self.available_bike_stands, self.available_bikes)
        #return self.timestamp

    class Meta:
        managed = False
        db_table = 'bike_availability'


class EventInfo(models.Model):
    index_id = models.IntegerField(primary_key=True, blank=False, null=False)
    timestamp = models.TextField(blank=False, null=False)
    name = models.TextField(blank=False, null=False)
    address_1 = models.TextField(blank=False, null=False)
    time = models.TextField(blank=False, null=False)
    duration = models.TextField(blank=False, null=False)
    lat = models.FloatField(blank=False, null=False)
    lon = models.FloatField(blank=False, null=False)
    yes_rsvp_count = models.FloatField(blank=False, null=False)
    maybe_rsvp_count = models.FloatField(blank=False, null=False)

    class Meta:
        managed = False
        db_table = 'event_info'


class PollutionLevel(models.Model):
    index_id = models.IntegerField(primary_key=True, blank=False, null=False)
    timestamp = models.TextField(blank=False, null=False)
    number = models.FloatField(blank=False, null=False)
    lat = models.FloatField(blank=False, null=False)
    lng = models.FloatField(blank=False, null=False)
    aqi = models.FloatField(blank=False, null=False)
    dominant_pollutant = models.TextField(blank=False, null=False)
    co = models.FloatField(blank=False, null=False)
    no2 = models.FloatField(blank=False, null=False)
    o3 = models.FloatField(blank=False, null=False)
    so2 = models.FloatField(blank=False, null=False)
    pm10 = models.FloatField(blank=False, null=False)
    pm25 = models.FloatField(blank=False, null=False)

    class Meta:
        managed = False
        db_table = 'pollution_level'


class TrafficInfo(models.Model):
    index_id = models.IntegerField(primary_key=True, blank=False, null=False)
    timestamp = models.TextField(blank=False, null=False)
    number = models.FloatField(blank=False, null=False)
    distance = models.FloatField(blank=False, null=False)
    duration = models.FloatField(blank=False, null=False)

    class Meta:
        managed = False
        db_table = 'traffic_info'
