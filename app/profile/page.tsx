'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Home, Settings, User, Mail, Phone, MapPin, Bell, Shield } from 'lucide-react';
import Link from 'next/link';
import { useFavoriteStore } from '@/store/favoriteStore';

export default function ProfilePage() {
  const { favorites } = useFavoriteStore();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
                <p className="text-gray-600 mb-4">Manage your property preferences and saved listings</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link href="/properties">
                    <Button>
                      <Home className="h-4 w-4 mr-2" />
                      Browse Properties
                    </Button>
                  </Link>
                  <Link href="/favorites">
                    <Button variant="outline">
                      <Heart className="h-4 w-4 mr-2" />
                      Saved Properties ({favorites.length})
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{favorites.length}</p>
                  <p className="text-sm text-gray-600">Saved Properties</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-info/10 flex items-center justify-center">
                  <Home className="h-6 w-6 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-600">Property Views</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-600">Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings & Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Account Settings
              </CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
                <User className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Personal Information</p>
                  <p className="text-sm text-gray-600">Update your profile details</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
                <Mail className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Email Preferences</p>
                  <p className="text-sm text-gray-600">Manage notifications</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
                <Shield className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Privacy & Security</p>
                  <p className="text-sm text-gray-600">Control your privacy</p>
                </div>
              </button>
            </CardContent>
          </Card>

          {/* Search Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Search Preferences
              </CardTitle>
              <CardDescription>Set your property search defaults</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
                <Home className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Property Type</p>
                  <p className="text-sm text-gray-600">Set preferred property types</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
                <MapPin className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Preferred Locations</p>
                  <p className="text-sm text-gray-600">Save favorite areas</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
                <Bell className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Price Alerts</p>
                  <p className="text-sm text-gray-600">Get notified of price changes</p>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
